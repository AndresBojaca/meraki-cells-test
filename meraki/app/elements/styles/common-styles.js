import { css } from 'lit-element';

export default css`
  ul,
  ol,
  li,
  figure,
  p,
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sr-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  .message .wrapper-text{
    text-align: center; margin-top: 2rem;
  }
  .form-control {
    margin-bottom: .5rem;
  }
  .message-container{
    margin-top: 1rem;
    text-align: center;
  }
  .shareholder-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
  }
  .text-center{
    text-align: center;
  }
  .d-flex{
    display: flex;
  }
  .gap-1{
    gap: .5rem;
  }
  .app-main-content{
    width: 90%;
  }
`;
