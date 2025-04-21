import { useEffect, useState } from "react";
import "./style.css";
const tenureData = [12, 24, 36, 48, 60, 72];
const EMI = () => {
  const [cost, setCost] = useState(10000);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);

  function calculateEmi(downpayment) {
    //EMI AMOUNT =[P*R*(1+R)^N]/[(1+R)^N-1]
    if (!cost) return 0;
    const loanAmt = cost - downpayment;
    const rateOfInterestMonthly = interest / 100 / 12;
    const numOfMonth = tenure;

    if (rateOfInterestMonthly === 0) {
      return (loanAmt / numOfMonth).toFixed(0);
    }
    const EMI =
      (loanAmt *
        rateOfInterestMonthly *
        (1 + rateOfInterestMonthly) ** numOfMonth) /
      ((1 + rateOfInterestMonthly) ** numOfMonth - 1);

    return Number(EMI).toFixed(0);
  }

  function calculateDownpayment(emi) {
    if (!cost) return 0;
    const rateOfInterestMonthly = interest / 100 / 12;
    const numOfMonth = tenure;

    if (rateOfInterestMonthly === 0) {
      return cost - emi * numOfMonth;
    }

    const loanAmt =
      (emi * ((1 + rateOfInterestMonthly) ** numOfMonth - 1)) /
      (rateOfInterestMonthly * (1 + rateOfInterestMonthly) ** numOfMonth);

    return Number(cost - loanAmt).toFixed(0);
  }

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [downPayment, tenure, cost]);

  function updateEmi(e) {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp);

    // calculateEmi and update it
    setEmi(calculateEmi(dp));
  }
  function updateDownPayment(e) {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    // calculate Downpayment and update it
    const dp = calculateDownpayment(emi);

    setDownPayment(dp);
  }

  return (
    <div
      className="app"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 className="title">EMI calculator</h1>

      {/* Total Cost of Asset Section */}
      <label htmlFor=""> Total Cost of Asset</label>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        placeholder="Total Cost of Assets"
      />

      {/* Interest Rate Section */}
      <label htmlFor=""> Interest Rate</label>
      <input
        type="number"
        value={interest}
        onChange={(e) => setInterest(Number(e.target.value))}
        placeholder="Interest Rate (in %)"
      />

      {/* Processing Fee Section  */}

      <label htmlFor=""> Processing Fee</label>
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(Number(e.target.value))}
        placeholder="Processing Fee (in %)"
      />
      <br />
      {/* Down Payment Slider Section */}
      <label htmlFor=""> Down Payment</label>
      <input
        type="range"
        min={0}
        max={cost}
        value={downPayment}
        onChange={updateEmi}
      />
      <div>
        <span>0%</span>
        <span> ........................</span>
        <span>
          {downPayment} ( {((downPayment / cost) * 100).toFixed(2)} % )
        </span>
        <span> ........................</span>
        <span>100%</span>
      </div>
      <br />

      {/* Loan per Month Slider Section */}
      <label htmlFor=""> Loan per Month</label>
      <input
        type="range"
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
        value={emi}
        onChange={updateDownPayment}
      />
      <div>
        <span>{calculateEmi(cost)}</span>
        <span> ........................</span>

        <span>{emi}</span>
        <span> ........................</span>

        <span>{calculateEmi(0)}</span>
      </div>
      <br />

      {/* Tenure Section */}
      <label htmlFor=""> Tenure</label>
      <div>
        {tenureData.map((value, index) => (
          <button
            key={index}
            onClick={() => setTenure(Number(value))}
            style={{ backgroundColor: value === tenure ? "green" : "white" }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EMI;
