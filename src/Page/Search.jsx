import React, { useState, useEffect } from "react";

const Search = () => {
  // Search input uchun qiymatni saqlash uchun holat (state)
  const [searchQuery, setSearchQuery] = useState("");

  // Qidiruv natijalarini saqlash uchun holat
  const [searchResults, setSearchResults] = useState([]);

  // Hover qilingan so'zni saqlash uchun holat
  const [highlightedWord, setHighlightedWord] = useState(null);

  // Sichqoncha pozitsiyasini hover qilingan so'zni ko'rsatish uchun saqlash
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Joriy sahifani saqlash uchun holat
  const [currentPage, setCurrentPage] = useState(1);

  // Umumiy sahifalar sonini saqlash uchun holat
  const [totalPages, setTotalPages] = useState(1);

  // API manzilini o'zgarmas qiymat sifatida belgilash
  const API_URL = "https://dictionary.uzfati.uz/api/text/search/";

  // Qidiruv tugmasi bosilganda API'ga so'rov yuborish
  const handleSearch = async () => {
    // Agar input bo'sh bo'lsa, hech narsa qilmaslik
    if (!searchQuery) return;

    try {
      // API'ga fetch orqali so'rov yuborish
      const response = await fetch(
        `${API_URL}?prefix=${searchQuery}&search_type=lemma&page=${currentPage}`
      );
      const data = await response.json();

      // Olingan natijalarni holatga saqlash
      setSearchResults(data.results.search_results);

      // Umumiy sahifalar sonini hisoblash (10 natija har bir sahifada deb faraz qilinmoqda)
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Ma'lumot olishda xatolik yuz berdi:", error);
    }
  };

  // Tozalash tugmasi bosilganda barcha holatlarni tozalash
  const handleClear = () => {
    setSearchQuery(""); // Inputni tozalash
    setSearchResults([]); // Natijalarni tozalash
    setCurrentPage(1); // Joriy sahifani birinchi sahifaga qaytarish
  };

  // Hover qilingan so'zni va sichqoncha pozitsiyasini belgilash
  const handleWordHover = (word, event) => {
    setHighlightedWord(word); // So'zni belgilash
    setHoverPosition({ x: event.clientX, y: event.clientY }); // Sichqoncha pozitsiyasini olish
  };

  // Hoverdan chiqishda belgilangan so'zni tozalash
  const handleWordLeave = () => {
    setHighlightedWord(null);
  };

  // Sahifa o'zgartirilganda yangi sahifadagi natijalarni olish
  const handlePageChange = (page) => {
    setCurrentPage(page); // Joriy sahifani yangilash
    handleSearch(); // Yangi sahifadagi ma'lumotlarni yuklash
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Qidiruv inputi va tugmalar */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Input maydoni */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Input qiymatini holatga yozish
          placeholder="So‘zni kiriting"
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        {/* Qidirish tugmasi */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Qidirish
        </button>
        {/* Tozalash tugmasi */}
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Tozalash
        </button>
      </div>

      {/* Qidiruv natijalari */}
      <div className="space-y-4">
        {searchResults.map((result) => (
          <div
            key={result.id} // Har bir natijaga unikal kalit berish
            className="border border-gray-300 rounded-lg p-4 relative"
          >
            {/* Matnni so'zlarga ajratib ko'rsatish */}
            <p>
              {result.content.split(" ").map((word, idx) => (
                <span
                  key={idx} // Har bir so'z uchun unikal kalit
                  className={
                    result.matches.some((match) => match.word === word) // Agar so'z match ichida bo'lsa, ajratish
                      ? "bg-yellow-300 cursor-pointer" // Ajratilgan rang va hover ko'rinish
                      : ""
                  }
                  onMouseEnter={(e) =>
                    result.matches.some((match) => match.word === word) &&
                    handleWordHover(word, e) // Hover bosilganda so'zni belgilash
                  }
                  onMouseLeave={handleWordLeave} // Hoverdan chiqishda tozalash
                >
                  {word}{" "} {/* Har bir so'zni joyiga qo'yish */}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Hover qilingan so'zni ko'rsatish */}
      {highlightedWord && (
        <div
          className="absolute bg-gray-900 text-white p-2 rounded-lg"
          style={{ top: hoverPosition.y + 10, left: hoverPosition.x + 10 }} // Sichqoncha pozitsiyasida ko'rsatish
        >
          {highlightedWord} {/* So'zni chiqarish */}
        </div>
      )}

      {/* Paginatsiya tugmalari */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page} // Har bir tugmaga unikal kalit
            onClick={() => handlePageChange(page)} // Sahifani o'zgartirish
            className={`px-3 py-1 rounded-lg ${currentPage === page // Joriy sahifa tugmasi ajratilgan rangda
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
              }`}
          >
            {page} {/* Sahifa raqami */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
