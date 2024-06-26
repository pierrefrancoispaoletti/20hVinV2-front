import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CategorySelector from "../../components/CategorySelector/CategorySelector";

const HomePage = ({ loading, setLoading }) => {
  return (
    <div>
      <CategorySelector />
    </div>
  );
};

export default HomePage;
