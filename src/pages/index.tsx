import { useState } from 'react';
import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import Header from '../components/Header';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [pagination, setPagination] = useState(postsPagination.next_page);

  async function handleGetMorePosts(): Promise<void> {
    const postsResponse = await fetch(pagination);
    const parsedPosts = await postsResponse.json();

    const results = parsedPosts.results.map(post => {
      const formattedDate = format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      );

      return {
        uid: post.uid,
        first_publication_date: formattedDate,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPosts([...posts, ...results]);
    setPagination(parsedPosts.next_page);
  }

  return (
    <div className={styles.container}>
      <Header />
      {posts.map(post => (
        <div className={styles.post} key={post.uid}>
          <strong>{post.data.title}</strong>
          <p>{post.data.subtitle}</p>
          <div>
            <p>
              <FiCalendar />
              {post.first_publication_date}
            </p>

            <p>
              <FiUser />
              {post.data.author}
            </p>
          </div>
        </div>
      ))}
      {pagination && (
        <button type="button" onClick={() => handleGetMorePosts()}>
          Carregar mais posts
        </button>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
    }
  );

  const results = postsResponse.results.map(post => {
    const formattedDate = format(
      new Date(post.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    );

    return {
      uid: post.uid,
      first_publication_date: formattedDate,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results,
      },
    },
  };
};
