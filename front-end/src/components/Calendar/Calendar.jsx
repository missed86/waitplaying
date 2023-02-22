import styled from "styled-components";

const Component = styled.div`
  display: flex;
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  /* border: 2px solid rgb(32, 32, 32); */
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 5px;
`;
const Header = styled.div`
  display: flex;
  background-color: #202020;
  text-transform: uppercase;
  padding: 10px;
`;
const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Weekday = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;
const Days = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const Day = styled.div`
  display: flex;
  flex: 1;
  padding: 10px;
  border: 1px solid #303030;
`;
export default function Calendar() {
  return (
    <Component>
      <Header>February 2023</Header>
      <Week>
        <Weekday>mon</Weekday>
        <Weekday>tue</Weekday>
        <Weekday>wed</Weekday>
        <Weekday>thu</Weekday>
        <Weekday>fri</Weekday>
        <Weekday>sat</Weekday>
        <Weekday>sun</Weekday>
      </Week>
      <Days>
        <Row>
          <Day>1</Day>
          <Day>2</Day>
          <Day>3</Day>
          <Day>4</Day>
          <Day>5</Day>
          <Day>6</Day>
          <Day>7</Day>
        </Row>
        <Row>
          <Day>8</Day>
          <Day>9</Day>
          <Day>10</Day>
          <Day>11</Day>
          <Day>12</Day>
          <Day>13</Day>
          <Day>14</Day>
        </Row>
        <Row>
          <Day>15</Day>
          <Day>16</Day>
          <Day>17</Day>
          <Day>18</Day>
          <Day>19</Day>
          <Day>20</Day>
          <Day>21</Day>
        </Row>
        <Row>
          <Day>21</Day>
          <Day>22</Day>
          <Day>23</Day>
          <Day>24</Day>
          <Day>25</Day>
          <Day>26</Day>
          <Day>27</Day>
        </Row>
        <Row>
          <Day>28</Day>
          <Day>29</Day>
          <Day>30</Day>
          <Day>31</Day>
          <Day></Day>
          <Day></Day>
          <Day></Day>
        </Row>
      </Days>
    </Component>
  );
}
