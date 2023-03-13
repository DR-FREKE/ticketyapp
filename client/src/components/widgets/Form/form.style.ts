import styled from 'styled-components';

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 13px;
  text-align: left;
  margin-bottom: 1rem;
  input {
    appearance: none;
    border-width: 1px;
    border-radius: 0.25rem;
    width: 100%;
    padding: 0.7rem 0.75rem;
    --tw-text-opacity: 1;
    color: rgb(55 65 81 / var(--tw-text-opacity));
    line-height: 1.25;
    outline: none;
    :focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }
`;

export const PassType = styled.div`
  position: relative;
  display: flex;
  padding-right: 5px;
  width: 100%;
  align-items: center;
  border-width: 1px;
  border-radius: 0.25rem;
  padding: 0.7rem 0.75rem;
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
  line-height: 1.25;
  outline: none;
  input {
    width: 95%;
    border: none;
    padding: 0;
  }
  .p_visible {
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-self: center;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 0.5em;
  }
`;
