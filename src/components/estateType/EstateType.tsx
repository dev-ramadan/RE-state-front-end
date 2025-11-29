import CardDetils from '../../ui/CardDetils';
import Header from '../auth/FormHeader';

interface IProps {}

const EstateType = ({}: IProps) => {
  return (
    <section className="mb-32 mt-5">
      <div className="p-5">
        <Header Hchildren="Browse by Property Type" Hcolor="gray-900" />
      </div>
      <div className="flex justify-center items-center flex-wrap gap-3 w-full">
        <CardDetils
          Pfont="semibold"
          Hfont="semibold"
          Hcolor="gray-900"
          effect="border-blue-400"
          icon={'🏠'}
          title="0 listing"
          count={'House'}
        />
        <CardDetils
          Pfont="semibold"
          Hfont="semibold"
          Hcolor="gray-900"
          effect="border-blue-400"
          icon={'🏢'}
          title="0 listing"
          count={'Apartments'}
        />
        <CardDetils
          Pfont="semibold"
          Hfont="semibold"
          Hcolor="gray-900"
          effect="border-blue-400"
          icon={'🏙️'}
          title="0 listing"
          count={'Condos'}
        />
        <CardDetils
          Pfont="semibold"
          Hfont="semibold"
          Hcolor="gray-900"
          effect="border-blue-400"
          icon={'🌾'}
          title="0 listing"
          count={'Land'}
        />
      </div>
    </section>
  );
};
export default EstateType;
