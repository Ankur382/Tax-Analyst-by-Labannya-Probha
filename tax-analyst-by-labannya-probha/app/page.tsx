'use client';
import { useState, ChangeEvent } from 'react';

export default function TaxAnalyzer() {
  const [data, setData] = useState({
    prevAssets: 2261592, currAssets: 3013405,
    prevLiab: 0, currLiab: 232000,
    currIncome: 544469, currExempt: 479542, currExpense: 414000
  });

  const prevNetWealth = data.prevAssets - data.prevLiab;
  const currNetWealth = data.currAssets - data.currLiab;
  const netWealthGrowth = currNetWealth - prevNetWealth;
  const availableFund = (data.currIncome + data.currExempt) - data.currExpense;

  const flags = [];
  
  if (netWealthGrowth > availableFund) {
    flags.push({
      title: "Section 265 Risk (Unexplained Investment)",
      desc: "নিট সম্পদ বৃদ্ধি আপনার তহবিলের উৎসের চেয়ে বেশি। আয়কর আইন ২০২৩ এর ধারা ২৬৫ অনুযায়ী এই অতিরিক্ত সম্পদকে আয় হিসেবে ধরে ট্যাক্স করা হবে।",
      solution: "মায়ের গিফট বা পলিসি সারেন্ডারের প্রমাণ ফাইলে যুক্ত করুন।"
    });
  }
  
  if (data.currExpense > (data.currIncome + data.currExempt)) {
    flags.push({
      title: "Section 266 Risk (Unexplained Expenditure)",
      desc: "আপনার জীবনযাপন ব্যয় মোট আয়ের চেয়ে বেশি। এটি বড় অডিট রিস্ক।",
      solution: "গত বছরের হাতে থাকা নগদ টাকা বা লোনের ব্যবহার IT-10BB তে দেখান।"
    });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setData({ ...data, [e.target.name]: Number(e.target.value) });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">BD Tax Compliance Cloud Engine</h1>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-3 bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold text-blue-700">আয় ও ব্যয় (Income & Expense)</h2>
            <input type="number" name="currIncome" value={data.currIncome} onChange={handleChange} className="w-full p-2 border rounded" placeholder="বর্তমান আয়" />
            <input type="number" name="currExempt" value={data.currExempt} onChange={handleChange} className="w-full p-2 border rounded" placeholder="করমুক্ত আয়" />
            <input type="number" name="currExpense" value={data.currExpense} onChange={handleChange} className="w-full p-2 border rounded" placeholder="জীবনযাপন ব্যয়" />
          </div>
          <div className="space-y-3 bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold text-blue-700">সম্পদ ও দায় (Assets & Liabilities)</h2>
            <input type="number" name="prevAssets" value={data.prevAssets} onChange={handleChange} className="w-full p-2 border rounded" placeholder="গত বছরের সম্পদ" />
            <input type="number" name="currAssets" value={data.currAssets} onChange={handleChange} className="w-full p-2 border rounded" placeholder="বর্তমান সম্পদ" />
            <input type="number" name="currLiab" value={data.currLiab} onChange={handleChange} className="w-full p-2 border rounded" placeholder="বর্তমান দায়" />
          </div>
        </div>

        <div>
          {flags.length === 0 ? (
             <div className="p-4 bg-green-100 text-green-800 rounded font-bold">ফাইলে কোনো অসামঞ্জস্য নেই। ফাইলটি নিরাপদ!</div>
          ) : (
            flags.map((flag, idx) => (
              <div key={idx} className="mb-4 p-4 border-l-4 border-red-500 bg-red-50 rounded">
                <h3 className="font-bold text-red-800">{flag.title}</h3>
                <p className="text-gray-700 my-1">{flag.desc}</p>
                <p className="text-sm font-bold text-green-700">সমাধান: {flag.solution}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}