// Business routes placeholder
import { Router } from 'express';
import slugify from 'slugify';
import Business from '../models/Business.js';
import { auth } from '../middleware/auth.js';
import { upload, fileToUrl } from '../utils/upload.js';

const r = Router();

// Public: lấy info doanh nghiệp theo slug
r.get('/:slug', async (req, res) => {
  const biz = await Business.findOne({ slug: req.params.slug });
  if (!biz) return res.status(404).json({ msg: 'Not found' });
  res.json(biz);
});

// User: nộp hồ sơ xác minh / claim
r.post(
  '/claim',
  auth(true),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'docs', maxCount: 5 },
  ]),
  async (req, res) => {
    const { name, email, phone, address, website, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const logoUrl = req.files?.logo?.[0]
      ? fileToUrl(req.files.logo[0].filename)
      : '';
    const documents = (req.files?.docs || []).map((f) => fileToUrl(f.filename));
    const biz = await Business.create({
      name,
      slug,
      email,
      phone,
      address,
      website,
      description,
      ownerUserId: req.user.uid,
      logoUrl,
      documents,
      status: 'pending',
    });
    res.json({ ok: true, business: biz });
  }
);

// User: cập nhật hồ sơ (khi đang pending hoặc bị reject)
r.put(
  '/:id',
  auth(true),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'docs', maxCount: 5 },
  ]),
  async (req, res) => {
    const biz = await Business.findById(req.params.id);
    if (!biz) return res.status(404).json({ msg: 'Not found' });
    if (String(biz.ownerUserId) !== req.user.uid)
      return res.status(403).json({ msg: 'Not owner' });

    const patch = { ...req.body };
    if (req.files?.logo?.[0])
      patch.logoUrl = fileToUrl(req.files.logo[0].filename);
    if (req.files?.docs?.length)
      patch.documents = (req.files.docs || []).map((f) =>
        fileToUrl(f.filename)
      );
    patch.status = 'pending';
    await Business.findByIdAndUpdate(biz._id, patch);
    res.json({ ok: true });
  }
);

export default r;
