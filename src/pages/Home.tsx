import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import Layout from '../components/Layout';
import {getAllPosts, type Post} from '../lib/posts';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <Layout>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.slug} className="post-item">
            <h2 className="post-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="post-meta">{post.date}</div>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
