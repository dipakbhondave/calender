import swami from "../assets/swami.jpg";
import gandhi from "../assets/gandhi.jpg";
import abedkar from "../assets/abedkar.jpg";
import shivaji from "../assets/shivaji.jpg";
import patel from "../assets/patel.jpg";
import nehru from "../assets/nehru.jpg";
import shastri from "../assets/shastri.jpg";
import independence from "../assets/independence.jpg";
import women from "../assets/women.jpg";
import holi from "../assets/holi.jpg";
import padwa from "../assets/padwa.jpg";
import navami from "../assets/navami.jpg";
import maharashtra from "../assets/maharashtra.jpg";
import guru from "../assets/guru.jpg";

interface ImportantDate {
  date: string; // Format: MM-DD
  name: string;
  type: 'festival' | 'jayanti' | 'punyatithi';
  image: string;
  description: string;
}

export const importantDates: ImportantDate[] = [
  {
    date: "01-12",
    name: "Swami Vivekananda",
    type: "jayanti",
    image: swami,
    description: "Birth anniversary of Swami Vivekananda, a spiritual leader and philosopher"
  },
  {
    date: "07-04",
    name: "Swami Vivekananda",
    type: "punyatithi",
    image: swami,
    description: "Death anniversary of Swami Vivekananda"
  },
  {
    date: "10-02",
    name: "Mahatma Gandhi",
    type: "jayanti",
    image: gandhi,
    description: "Birth anniversary of Mahatma Gandhi, Father of the Nation"
  },
  {
    date: "01-30",
    name: "Mahatma Gandhi",
    type: "punyatithi",
    image: gandhi,
    description: "Death anniversary of Mahatma Gandhi"
  },
  {
    date: "04-14",
    name: "Dr. B.R. Ambedkar",
    type: "jayanti",
    image: abedkar,
    description: "Birth anniversary of Dr. B.R. Ambedkar, architect of Indian Constitution"
  },
  {
    date: "12-06",
    name: "Dr. B.R. Ambedkar",
    type: "punyatithi",
    image: abedkar,
    description: "Death anniversary of Dr. B.R. Ambedkar"
  },
  {
    date: "02-19",
    name: "Chhatrapati Shivaji Maharaj",
    type: "jayanti",
    image: shivaji,
    description: "Birth anniversary of Chhatrapati Shivaji Maharaj, the Maratha warrior king"
  },
  {
    date: "04-03",
    name: "Chhatrapati Shivaji Maharaj",
    type: "punyatithi",
    image: shivaji,
    description: "Death anniversary of Chhatrapati Shivaji Maharaj"
  },
  {
    date: "10-31",
    name: "Sardar Vallabhbhai Patel",
    type: "jayanti",
    image: patel,
    description: "Birth anniversary of Sardar Vallabhbhai Patel, the Iron Man of India"
  },
  {
    date: "12-15",
    name: "Sardar Vallabhbhai Patel",
    type: "punyatithi",
    image: patel,
    description: "Death anniversary of Sardar Vallabhbhai Patel"
  },
  {
    date: "11-14",
    name: "Jawaharlal Nehru",
    type: "jayanti",
    image: nehru,
    description: "Birth anniversary of Jawaharlal Nehru, the first Prime Minister of India"
  },
  {
    date: "05-27",
    name: "Jawaharlal Nehru",
    type: "punyatithi",
    image: nehru,
    description: "Death anniversary of Jawaharlal Nehru"
  },
  {
    date: "10-02",
    name: "Lal Bahadur Shastri",
    type: "jayanti",
    image: shastri,
    description: "Birth anniversary of Lal Bahadur Shastri, India's second Prime Minister"
  },
  {
    date: "01-11",
    name: "Lal Bahadur Shastri",
    type: "punyatithi",
    image: shastri,
    description: "Death anniversary of Lal Bahadur Shastri"
  },
  {
    date: "01-26",
    name: "Republic Day",
    type: "festival",
    image: independence,
    description: "Celebrating the adoption of the Constitution of India"
  },
  {
    date: "03-08",
    name: "International Women's Day",
    type: "festival",
    image: women,
    description: "Celebrating the achievements and empowerment of women"
  },
  {
    date: "03-25",
    name: "Holi",
    type: "festival",
    image: holi,
    description: "Festival of colors celebrating the victory of good over evil"
  },
  {
    date: "04-02",
    name: "Gudi Padwa",
    type: "festival",
    image: padwa,
    description: "Maharashtrian New Year and harvest festival"
  },
  {
    date: "04-06",
    name: "Ram Navami",
    type: "festival",
    image: navami,
    description: "Celebrating the birth of Lord Rama"
  },
  {
    date: "05-01",
    name: "Maharashtra Day",
    type: "festival",
    image: maharashtra,
    description: "Commemorates the formation of Maharashtra state in 1960"
  },
  {
    date: "07-10",
    name: "Guru Purnima",
    type: "festival",
    image: guru,
    description: "Day to honor and express gratitude to gurus and teachers"
  }
];
