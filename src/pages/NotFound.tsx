import {Link} from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div style={{textAlign: 'center', marginTop: '50px'}}>
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          style={{
            fontSize: '1.2rem',
            marginTop: '20px',
            display: 'inline-block',
          }}
        >
          Go back home
        </Link>
      </div>
    </Layout>
  );
}
