// BusinessPublic page placeholder
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

export default function BusinessPublic() {
  const { slug } = useParams();
  const [biz, setBiz] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/business/${slug}`)
      .then((res) => setBiz(res.data))
      .catch(() => setBiz(null));
    api
      .get(`/products/by-business/${slug}`)
      .then((res) => setProducts(res.data));
  }, [slug]);

  if (!biz)
    return <div style={{ padding: 24 }}>Không tìm thấy doanh nghiệp.</div>;

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {biz.logoUrl && (
          <img src={`http://localhost:5000${biz.logoUrl}`} width={72} />
        )}
        <div>
          <h2>
            {biz.name} {biz.status === 'verified' ? '✅' : '⏳'}
          </h2>
          <p>{biz.description}</p>
          <p>
            <b>Website:</b>{' '}
            <a href={biz.website} target='_blank'>
              {biz.website}
            </a>
          </p>
          <p>
            <b>Liên hệ:</b> {biz.email} | {biz.phone}
          </p>
          <p>
            <b>Địa chỉ:</b> {biz.address}
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 24 }}>Sản phẩm</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))',
          gap: 16,
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}
          >
            {p.imageUrl && (
              <img src={`http://localhost:5000${p.imageUrl}`} width='100%' />
            )}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div>SKU: {p.sku || '-'}</div>
              <div>₫{p.price?.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
