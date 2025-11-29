import { Search } from 'lucide-react';
import Header from '../auth/FormHeader';
import Input from '../../ui/Input';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';
import CardDetils from '../../ui/CardDetils';

const Main = () => {
  return (
    <main className="">
      {/* top */}
      <div className="min-h-auto bg-gray-50 ">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mt-3">
              <Header
                Hcolor={'blue-100'}
                Pcolor={'blue-100'}
                Hchildren={'Find Your Dream Home'}
                Pchildren={'Discover the best properties for sale and rent in your area'}
              />
            </div>
          </div>
          {/* Search */}
          <div className="w-[80%] mx-auto">
            <InputField id="search">
              <Button
                children={'Search'}
                icon={<Search />}
                className="flex absolute w-fit right-3 p-2 top-4"
              />
              <Input
                type="text"
                id="search"
                name="search"
                placeholder="Search"
                className="mb-16 p-6 bg-white placeholder:text-gray-500  placeholder:md:text-lg text-black border-none outline-none"
              />
            </InputField>
          </div>

          {/* Card */}
          <div className="relative">
            <div className="flex justify-around items-center absolute w-full -top-10 flex-wrap gap-2.5 mb-4 md:mb-0">
              <CardDetils
                Hfont="bold"
                Pfont="semibold"
                count={'0'}
                title="Properties Listed"
                Hcolor="blue-700"
              />
              <CardDetils
                Hfont="bold"
                Pfont="semibold"
                count={'0'}
                title="For Sale"
                Hcolor="blue-700"
              />
              <CardDetils
                Hfont="bold"
                Pfont="semibold"
                count={'0'}
                title="For Rent"
                Hcolor="blue-700"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Main;
