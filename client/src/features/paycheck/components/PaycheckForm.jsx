import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import fetchAxios from '../../../lib/fetchAxios';
import { SessionContext } from '../../../context/SessionContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import useIncomeSources from '../hooks/useIncomeSources';
import formatAxiosErrors from '../../../utils/formatAxiosErrors';

const PaycheckForm = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  const { incomeSources } = useIncomeSources("/api/income_sources", session);
  const [errors, setErrors] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    income_source_id: "",
    amount: 0
  })

  function handleFormChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

function handleSelectChange(e) {
  setFormData(prev => {
    const newData = { ...prev };
    delete newData.income_source_id;
    delete newData.income_source_attributes;

    if (e?.__isNew__) {
      newData.income_source_attributes = { name: e?.value };
    } else {
      newData.income_source_id = e?.value;
    }

    return newData;
  });
}

  function handleSubmit (e) {
    e.preventDefault()
    fetchAxios({
      method: "POST",
      url: "/api/paychecks",
      data: formData
    }, session)
      .then(()=>navigate("/income"))
      .catch((err) => {
        setErrors(formatAxiosErrors(err))
      })
  }

  return (
    <>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input type="date" name="date" onChange={handleFormChange}/> <br/>
        <CreatableSelect isClearable options={incomeSources} onChange={handleSelectChange} />
        <label htmlFor="amount" >Amount:</label>
        <input type="number" name="amount" onChange={handleFormChange}/> <br/>
        <input className="bg-primary" type="submit" value="Submit"/>
        {errors? errors.map((error, index) => <p key={index}>{error}</p>) : null}
      </form>
    </>
  );
}

export default PaycheckForm;