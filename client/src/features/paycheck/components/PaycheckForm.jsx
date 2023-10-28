import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import fetchAxios from '../../../lib/fetchAxios';
import { SessionContext } from '../../../context/SessionContext';
import { useContext } from "react";

const PaycheckForm = () => {
  const session = useContext(SessionContext);

  const [incomeSources, setIncomeSources] = useState({});
  const [formData, setFormData] = useState({
    date: "",
    income_source_id: "",
    amount: 0
  })

  useEffect(() => {
    fetchAxios({
      method: "GET",
      url: "/api/income_sources",
    }, session)
      .then((res) => {
        setIncomeSources(res.data.map((incomeSource) => {
          return {
            value: incomeSource.id,
            label: incomeSource.name}
        }))
      })
  }, []);

  function handleFormChange (e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSelectChange (e) {
    if (e?.__isNew__) {
      setFormData((prev)=> {
        const { income_source_id , ...rest } = prev
        return {
          ...rest,
          income_source_attributes: { name: e.value }
        }
      })
    }
    else {
      setFormData((prev)=> {
        const { income_source_attributes , ...rest } = prev
        return {
          ...rest,
          income_source_id: e?.value
        }
      })
    }
  }

  console.log(formData)

  function handleSubmit (e) {
    e.preventDefault()
    fetchAxios({
      method: "POST",
      url: "/api/paychecks",
      data: formData
    }, session)
      .then((res) => {
        console.log(res)
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
      </form>
    </>
  );
}
export default PaycheckForm;