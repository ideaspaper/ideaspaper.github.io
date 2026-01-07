import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {useParams} from 'react-router-dom';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import Layout from '../components/Layout';
import {getPostBySlug, type Post} from '../lib/posts';

export default function BlogPost() {
  const {slug} = useParams<{slug: string}>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug).then(p => setPost(p || null));
    }
  }, [slug]);

  if (!post) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        <h1>{post.title}</h1>
        <div className="post-meta">{post.date}</div>
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {children, className, node, ...rest} = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  // @ts-expect-error - SyntaxHighlighter types are slightly off for this usage but it works at runtime
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={vscDarkPlus}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
}
