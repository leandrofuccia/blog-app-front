"use client"

import { Field } from "formik";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0070f3, #005bb5);
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  width: 350px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  img {
    width: 36px;
    height: 36px;
  }

  h1 {
    color: #0070f3;
    font-size: 24px;
  }
`;

export const StyledField = styled(Field)`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export const StyledErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #005bb5;
  }
`;

export const RegisterLink = styled.p`
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
  color: #0070f3;

  a {
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #005bb5;
    }
  }
`;

export const StyledSelect = styled(Field)`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;




