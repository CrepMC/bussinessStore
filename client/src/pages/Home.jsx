// Home page placeholder
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h1>Business Verify</h1>
      <p>Tra cứu doanh nghiệp đã xác minh & nộp hồ sơ xác minh.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to='/claim'>Nộp hồ sơ xác minh</Link>
        <Link to='/b/your-business-slug'>Xem trang doanh nghiệp demo</Link>
        <Link to='/admin'>Admin</Link>
      </div>
    </div>
  );
}
