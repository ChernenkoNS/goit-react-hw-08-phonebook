import css from '../Filter/Filter.module.css';

export const Filter = ({value, onChange}) => {



  return (
    <label className={css.filter}>
      Filter
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};
