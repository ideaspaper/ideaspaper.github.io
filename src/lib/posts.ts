export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

// Simple frontmatter parser that works in the browser without Node.js polyfills
function parseFrontmatter(raw: string) {
  const lines = raw.split('\n');
  const frontmatter: Record<string, string> = {};
  let contentStartIndex = 0;

  if (lines[0]?.trim() === '---') {
    let i = 1;
    while (i < lines.length && lines[i]?.trim() !== '---') {
      const line = lines[i];
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        frontmatter[key] = value;
      }
      i++;
    }
    contentStartIndex = i + 1;
  }

  return {
    data: frontmatter,
    content: lines.slice(contentStartIndex).join('\n'),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const modules = import.meta.glob('../posts/*.md', {
    query: '?raw',
    import: 'default',
  });

  const posts: Post[] = [];

  for (const path in modules) {
    const rawContent = (await modules[path]()) as string;
    const {data, content} = parseFrontmatter(rawContent);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    posts.push({
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
      content,
    });
  }

  // Sort by date descending
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}
