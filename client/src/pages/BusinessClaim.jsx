// BusinessClaim page placeholder
import { useForm } from 'react-hook-form';
import { api } from '../api';

export default function BusinessClaim() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const form = new FormData();
    ['name', 'email', 'phone', 'address', 'website', 'description'].forEach(
      (k) => form.append(k, data[k])
    );
    if (data.logo?.[0]) form.append('logo', data.logo[0]);
    Array.from(data.docs || []).forEach((f) => form.append('docs', f));
    const token = localStorage.getItem('token');
    if (token) api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await api.post('/business/claim', form);
    alert('Đã nộp, chờ admin duyệt.');
    reset();
  };

  return (
    <div style={{ maxWidth: 700, margin: '24px auto' }}>
      <h2>Nộp hồ sơ xác minh doanh nghiệp</h2>
      <p>Đăng nhập (user) trước khi nộp để quản lý hồ sơ.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id='name'
          name='name'
          {...register('name')}
          placeholder='Tên doanh nghiệp'
          required
        />
        <br />
        <input
          id='email'
          name='email'
          {...register('email')}
          placeholder='Email'
        />
        <br />
        <input
          id='phone'
          name='phone'
          {...register('phone')}
          placeholder='SĐT'
        />
        <br />
        <input
          id='address'
          name='address'
          {...register('address')}
          placeholder='Địa chỉ'
        />
        <br />
        <input
          id='website'
          name='website'
          {...register('website')}
          placeholder='Website'
        />
        <br />
        <textarea
          id='description'
          name='description'
          {...register('description')}
          placeholder='Mô tả'
        />
        <br />
        <label>
          Logo:{' '}
          <input id='logo' name='logo' type='file' {...register('logo')} />
        </label>
        <br />
        <label>
          Tài liệu xác minh:{' '}
          <input
            id='docs'
            name='docs'
            type='file'
            multiple
            {...register('docs')}
          />
        </label>
        <br />
        <button type='submit'>Gửi</button>
      </form>
    </div>
  );
}
