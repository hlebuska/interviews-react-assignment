import { useState } from "react";




export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {  
    setCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  }

  return {
    categories,
    setCategories,
    toggleCategory
  };
};
