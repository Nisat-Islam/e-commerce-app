import meat from '../img/meat.png';
import softdrinks from '../img/softdrinks.png';
import icecreamIcon from '../img/icecreamIcon.png';
import fruitIcon from '../img/fruitIcon.png';
import cookedfoodicon from '../img/cookedfoodicon.png';

export const categoryData = [
  {
    id: 1,
    name: 'Fruit',
    urlParamName: 'fruit',
    icon: fruitIcon,
  },
  {
    id: 2,
    name: 'Soft Drinks',
    urlParamName: 'drinks',
    icon: softdrinks,
  },
  {
    id: 3,
    name: 'Meat',
    urlParamName: 'meat',
    icon: meat,
  },
  {
    id: 4,
    name: 'Ice Cream',
    urlParamName: 'ice cream',
    icon: icecreamIcon,
  },
  {
    id: 5,
    name: 'Cooked food',
    urlParamName: 'cooked food',
    icon: cookedfoodicon,
  },
];

export const ratingData = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
