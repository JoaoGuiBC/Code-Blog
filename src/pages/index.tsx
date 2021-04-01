import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';

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

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.post}>
        <strong>Como utilizar hooks</strong>
        <p>pensando em sincronização em vez de ciclos de vida.</p>
        <div>
          <p>
            <FiCalendar />
            15 mar 2021
          </p>

          <p>
            <FiUser />
            João Guilherme Da Rocha
          </p>
        </div>
      </div>
      <div className={styles.post}>
        <strong>Como utilizar hooks</strong>
        <p>pensando em sincronização em vez de ciclos de vida.</p>
        <div>
          <p>
            <FiCalendar />
            15 mar 2021
          </p>

          <p>
            <FiUser />
            João Guilherme Da Rocha
          </p>
        </div>
      </div>
      <div className={styles.post}>
        <strong>Como utilizar hooks</strong>
        <p>pensando em sincronização em vez de ciclos de vida.</p>
        <div>
          <p>
            <FiCalendar />
            15 mar 2021
          </p>

          <p>
            <FiUser />
            João Guilherme Da Rocha
          </p>
        </div>
      </div>
      <button type="button">Carregar mais posts</button>
    </div>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
