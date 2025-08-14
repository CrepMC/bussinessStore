// Auth routes placeholder
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const r = Router();

// seed admin (1 lần đầu)
r.post('/seed-admin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ ok: false, msg: 'Email and password are required.' });
  }
  const exists = await User.findOne({ email });
  if (exists) return res.json({ ok: true, msg: 'Admin exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash, role: 'admin' });
  res.json({ ok: true });
});

r.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ ok: false, msg: 'Email and password are required.' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  res.json({ ok: true, userId: user._id });
});

r.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Email not found' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ msg: 'Wrong password' });
  const token = jwt.sign(
    { uid: user._id, role: user.role, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, role: user.role });
});

export default r;
