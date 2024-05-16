import { useDispatch } from "react-redux";
import { useHistoryPageSlice } from "./slice";
import { useSelector } from "react-redux";
import HistoryComponent from "../../Components/HistoryComponent";
import { useEffect } from "react";
import { selectHistory } from "./slice/selector";

export const HistoryComponentPage = () => {
  const userId = localStorage.getItem("id");
  const { actions } = useHistoryPageSlice();
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);

  useEffect(() => {
    dispatch(actions.getHistory({ userId: userId as string }));
  }, []);
  return <HistoryComponent history={history} />;
};
