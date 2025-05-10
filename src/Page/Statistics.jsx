
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { PiChartBarFill } from "react-icons/pi";
import { BiSolidGridAlt } from "react-icons/bi";
import { PiChartDonutFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { endpoints } from '../config/endpoints';
import { DataService } from '../config/Dataservice';

const COLORS = [
  '#489fb5',
  '#adc178',
  '#582f0e',
  '#ff0054',
  '#fca311',
  '#00a6fb',
  '#006400',
  '#2a9d8f',
  "#023e8a",
  '#000000',
  '#c1121f',
  '#495057',
  "#ccff33"
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-md  shadow-blue-300">
        <p className="text-lg font-medium">{label}</p>
        <p className="text-sm">So'zlar soni: {payload[0].value}</p>
      </div>
    );
  }

  return "uf";
};
export default function StatisticPage() {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.statistika);
      setApiData(response);
      console.log("BU TEAM emas bu statistik", response);

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    sessionStorage.clear();


  }, []);
  const maxCount = Math.max(...apiData?.map((item) => item.word_count));
  const [num, setNum] = useState(2)
  return (
    <div className='my-20'>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center">
        So'zlar soni bo'yicha statistika
      </h2>
      <main className="flex justify-end lg:px-28 px-10 mb-5 gap-5">
        <div className="text-2xl border rounded-lg bg-[crimson] text-white p-3" onClick={() => setNum(2)}><PiChartBarFill /></div>
        <div className="text-2xl border rounded-lg bg-[crimson] text-white p-3" onClick={() => setNum(1)}><PiChartDonutFill /></div>
        <div className="text-2xl border rounded-lg bg-[crimson] text-white p-3" onClick={() => setNum(3)}><BiSolidGridAlt /></div>
      </main>
      <div className="w-full min-h-[60vh] flex flex-col items-center ">
        {/* Main Title */}


        {/* Main Card Layout */}
        {num == 1 ?
          (<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3"
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={apiData}
                  dataKey="word_count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={80}
                  fill="#8884d8"
                  labelLine={false}
                  animationDuration={1000}
                >
                  {apiData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ fontWeight: 'bold', color: '#333' }}
                  formatter={(value, name) => `${value} so'zlar`}
                />
                <Legend
                  verticalAlign="top"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ padding: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Data Insights Section */}
            <div className="mt-4 sm:mt-6 md:mt-8 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-4">Mintaqadagi so'zlarni hisoblash</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {apiData?.map((region, index) => (
                  <div
                    key={region.id}
                    className={`p-3 sm:p-4 md:p-6 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300`}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  >
                    <h4 className="font-semibold text-sm sm:text-base md:text-lg text-white">{region.name}</h4>
                    <p className="text-sm sm:text-lg md:text-xl text-white">{region.word_count} So'zlar</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>) : num == 2 ? (<ResponsiveContainer width="90%" height={400}>
            <BarChart data={apiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              {/* <Tooltip /> */}
              <Tooltip content={<CustomTooltip />} />


              {/* <Bar dataKey="word_count" fill="#8884d8" barSize={50} /> */}
              <Bar
                dataKey="word_count"
                fillOpacity={1}
                barSize={50}
                shape={(props) => {
                  const barColor = COLORS[props.index % COLORS.length]; // Rangni aniqlash
                  return <rect {...props} fill={barColor} />;
                }}
              />
            </BarChart>
          </ResponsiveContainer>) : (
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8 w-full max-w-6xl px-10">
              {apiData?.map((item) => (
                <div
                  key={item.id}
                  className="bg-[white] text-gray-600 shadow-lg rounded-lg p-6 flex flex-col items-center"
                >
                  <h2 className="text-2xl font-semibold">{item.name}</h2>
                  <div className="w-full mt-4">
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-green-400"
                        style={{
                          width: `${(item.word_count / maxCount) * 100}%`,
                          transition: 'width 0.3s ease',
                        }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm">
                      {item.word_count > 0 ? `So'zlar soni: ${item.word_count}` : "Hech qanday so'z mavjud emas"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )

        }



      </div>
      {/* <div className='flex flex-wrap  gap-5 px-32'>{COLORS.map((e, i) =>
        <div className='h-28 w-96 flex items-center justify-center rounded-md text-white' style={{ backgroundColor: e }} >So'zlar soni: ${i}</div>

      )}</div> */}

    </div>
  );
}
