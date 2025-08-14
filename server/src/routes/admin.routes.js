// Admin routes placeholder
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import Business from '../models/Business.js';
import User from '../models/User.js';

const r = Router();

// danh sách hồ sơ chờ duyệt
r.get('/pending', auth(true), requireAdmin, async (_, res) => {
  const list = await Business.find({ status: 'pending' }).sort({
    createdAt: -1,
  });
  res.json(list);
});

// action: verify / reject
r.post('/business/:id/verify', auth(true), requireAdmin, async (req, res) => {
  const { action, reason } = req.body; // "verify" | "reject"
  const status = action === 'verify' ? 'verified' : 'rejected';
  const biz = await Business.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(biz);
});

// optional: list users
r.get('/users', auth(true), requireAdmin, async (_, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

export default r;
