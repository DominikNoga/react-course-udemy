const INPUT_NAMES = {
  INIT_INVESTMENT: 'initialInvestment',
  ANNUAL_INVESTMENT: 'annualInvestment',
  EXPECTED_RETURN: 'expectedReturn',
  DURATION: 'duration'
};

export default function InputPanel({investmentData, onInputChange}) {
  return (
    <section id='user-input'>
      <div className="input-group">
        <p>
          <label htmlFor={INPUT_NAMES.INIT_INVESTMENT}>INITIAL INVESTMENT</label>
          <input
            type="number"
            id={INPUT_NAMES.INIT_INVESTMENT}
            name={INPUT_NAMES.INIT_INVESTMENT}
            onChange={(event) => onInputChange(INPUT_NAMES.INIT_INVESTMENT, event.target.value)}
            value={investmentData.initialInvestment}
            min={0}
            required
          />
        </p>

        <p>
          <label htmlFor="annualInvestment">ANNUAL INVESTMENT</label>
          <input
            type="number"
            name={INPUT_NAMES.ANNUAL_INVESTMENT}
            id={INPUT_NAMES.ANNUAL_INVESTMENT}
            onChange={(event) => onInputChange(INPUT_NAMES.ANNUAL_INVESTMENT, event.target.value)}
            value={investmentData.annualInvestment}
            min={0}
            required
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="expectedReturn">EXPECTED RETURN</label>
          <input
            type="number"
            name={INPUT_NAMES.EXPECTED_RETURN}
            id={INPUT_NAMES.EXPECTED_RETURN}
            onChange={(event) => onInputChange(INPUT_NAMES.EXPECTED_RETURN, event.target.value)}
            value={investmentData.expectedReturn}
            min={0}
            required
          />
        </p>
        <p>
          <label htmlFor="duration">DURATION</label>
          <input
            type="number"
            name={INPUT_NAMES.DURATION}
            id={INPUT_NAMES.DURATION}
            onChange={(event) => onInputChange(INPUT_NAMES.DURATION, event.target.value)}
            value={investmentData.duration}
            min={1}
            required
          />
        </p>
      </div>
    </section>
  )
}
