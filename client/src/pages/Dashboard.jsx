// Dashboard page placeholder
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Dashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('token');
  if (token) api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

  useEffect(() => {
    // tạm: user tự nhớ businessId; trong thực tế cần endpoint "mine"
    // để demo, gọi admin/pending cũng ok, nhưng production bạn thêm /business/mine
  }, []);

  const loadProducts = async (slug) => {
    const { data } = await api.get(`/products/by-business/${slug}`);
    setProducts(data);
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <h2>Dashboard</h2>
      <p>
        Demo tối giản (bạn có thể mở rộng route /business/mine để lấy đúng doanh
        nghiệp của user).
      </p>
      {selected && (
        <button onClick={() => loadProducts(selected)}>Reload sản phẩm</button>
      )}
      <div style={{ marginTop: 12 }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}
          >
            {p.name} – ₫{p.price?.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}
