// AdminPanel page placeholder
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function AdminPanel() {
  const [list, setList] = useState([]);

  const fetchPending = async () => {
    const token = localStorage.getItem('token');
    if (token) api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const { data } = await api.get('/admin/pending');
    setList(data);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const act = async (id, action) => {
    await api.post(`/admin/business/${id}/verify`, { action });
    await fetchPending();
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <h2>Admin – Duyệt hồ sơ</h2>
      {list.map((b) => (
        <div
          key={b._id}
          style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {b.logoUrl && (
              <img src={`http://localhost:5000${b.logoUrl}`} width={56} />
            )}
            <div>
              <div style={{ fontWeight: 600 }}>{b.name}</div>
              <div>
                {b.email} | {b.phone}
              </div>
              <div>{b.address}</div>
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <div>
              <b>Tài liệu:</b>{' '}
              {(b.documents || []).map((d, i) => (
                <a key={i} href={`http://localhost:5000${d}`} target='_blank'>
                  Doc {i + 1}{' '}
                </a>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button onClick={() => act(b._id, 'verify')}>✅ Verify</button>
            <button onClick={() => act(b._id, 'reject')}>❌ Reject</button>
          </div>
        </div>
      ))}
      {!list.length && <div>Không có hồ sơ chờ.</div>}
    </div>
  );
}
