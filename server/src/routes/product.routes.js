// Product routes placeholder
import { Router } from 'express';
import Product from '../models/Product.js';
import Business from '../models/Business.js';
import { auth } from '../middleware/auth.js';
import { upload, fileToUrl } from '../utils/upload.js';

const r = Router();

// Public: list sản phẩm theo slug doanh nghiệp
r.get('/by-business/:slug', async (req, res) => {
  const biz = await Business.findOne({
    slug: req.params.slug,
    status: 'verified',
  });
  if (!biz) return res.json([]);
  const products = await Product.find({
    businessId: biz._id,
    active: true,
  }).sort({ createdAt: -1 });
  res.json(products);
});

// Owner: CRUD sản phẩm
r.post('/', auth(true), upload.single('image'), async (req, res) => {
  const { businessId, name, sku, price } = req.body;
  const biz = await Business.findById(businessId);
  if (!biz || String(biz.ownerUserId) !== req.user.uid)
    return res.status(403).json({ msg: 'Not allowed' });
  const imageUrl = req.file ? fileToUrl(req.file.filename) : '';
  const p = await Product.create({ businessId, name, sku, price, imageUrl });
  res.json(p);
});

r.put('/:id', auth(true), upload.single('image'), async (req, res) => {
  const prod = await Product.findById(req.params.id).populate('businessId');
  if (!prod || String(prod.businessId.ownerUserId) !== req.user.uid)
    return res.status(403).json({ msg: 'Not allowed' });
  const patch = { ...req.body };
  if (req.file) patch.imageUrl = fileToUrl(req.file.filename);
  const updated = await Product.findByIdAndUpdate(prod._id, patch, {
    new: true,
  });
  res.json(updated);
});

r.delete('/:id', auth(true), async (req, res) => {
  const prod = await Product.findById(req.params.id).populate('businessId');
  if (!prod || String(prod.businessId.ownerUserId) !== req.user.uid)
    return res.status(403).json({ msg: 'Not allowed' });
  await prod.deleteOne();
  res.json({ ok: true });
});

export default r;
