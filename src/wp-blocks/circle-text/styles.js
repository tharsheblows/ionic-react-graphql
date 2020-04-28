import { css } from '@emotion/core'

export const circleTextStyles = css`
  margin: 10px auto;
  overflow: hidden;

  .circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    font-size: 20px;
    background: red;
    line-height: 150px;
    text-align: center;
    color: white;
    float: left;
    margin: 10px;
  }

  .circle:hover {
    background: deeppink;
  }

  .circle a {
    color: white;
    text-decoration: none;
	box-shadow: none;
	:after{
		position: relative;
		height: 0;
	}

    &:hover {
      box-shadow: none;
      color: white;
    }
  }

  .circle span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    padding: 0 25px;
  }
}`
