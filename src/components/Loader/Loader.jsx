import { Dna } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css'

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <Dna
        visible={true}
        height="40"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
