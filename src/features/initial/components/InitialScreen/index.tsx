import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CenterSection, Title } from "./styles";
import { initialActions } from "../../slices";
import { Spin } from "antd";
import { RootState } from "../../../../app/types";
import { MainLayout } from "../../../../common/mainLayout/components";

const InitialScreen: React.FC = () => {
  const dispatch = useDispatch();
  const randomFactText = useSelector((state: RootState) => state.initial.randomFactText);
  const isRandomFactFetching = useSelector((state: RootState) => state.initial.isRandomFactFetching);

  useEffect(() => {
    dispatch(initialActions.fetchRandomFactStart());
  }, [dispatch]);

  return (
    <MainLayout>
      <Container>
        <CenterSection>
          <Spin tip="Loading..." spinning={isRandomFactFetching}>
            <Title data-testid="random-fact">{randomFactText}</Title>
          </Spin>
        </CenterSection>
      </Container>
    </MainLayout>
  );
};

export default InitialScreen;
