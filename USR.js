

import React,{useEffect, useState} from 'react';
import './usr.css';
//import cjson from 'cjson';

import Button from '@mui/material/Button';

const USR = () => {
  const [index, setIndex] = useState(0);
  const [selectedData, setSelectedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("in-edit");
  let finalJson;
  let sentence_id=0;

  const handleChange = (event, key, index) => {
    const newSelectedData = {...selectedData};
    newSelectedData[key][index] = event.target.value;
    setSelectedData(newSelectedData);
    console.log(newSelectedData)
  };


  const [users, setUsers] = useState([])

  const fetchData = () => {
    fetch("http://localhost:9999/orignal_usr_fetch")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
        const result = data
        console.log("Hi")
        console.log(index)
        const orobj=result[index].orignal_usr_json.replaceAll("'", "\"")
        console.log(orobj)
        const orignal_usr_json = JSON.parse(orobj);
        setSelectedData(orignal_usr_json);
        //setSelectedData(result[index].orignal_usr_json);
        setLoading(false);
        finalJson=result[index].orignal_usr_json;
      })
  }

  // useEffect(() => {
  //   fetchData()
  // }, [])


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const receivedIndex = searchParams.get("receivedindex") || 0;
    setIndex(receivedIndex ? receivedIndex : 0);
    fetchData()
  }, [index]);

  const viewTable = () => {
    setShowTable(true);
  }

  const saveChanges=()=>{
    const body = {
      finalJson: finalJson,
      sentence_id:sentence_id
    };
    fetch('http://localhost:9999/editusr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => {
        alert("Saved Successfully")
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const submitForReview = () => {
    setReviewStatus("in-review");
    updateDatabase();
  };
  
  const updateDatabase = () => {
    const body = {
      status: "in-review",
      sentence_id:sentence_id
      // add other data required by the backend API
    };
    fetch('http://localhost:9999/editstatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.ok) {
        alert("Status updated successfully");
      } else {
        alert("Failed to update status");
      }
    })
    .catch(error => {
      alert("Failed to update status: " + error);
    });
  };

  
  return (

    loading ? <div>Loading...</div> :

    <>
    <div className="usrBtnControls">
    {/* <input type="submit" className="usrEditButton" onClick={viewTable} value="Edit" />
    <input type="submit" className="usrEditButton"  onClick={saveChanges} value="Save" />
    <input type="submit" className="usr_rev_Button"  value="Submit for review" />
    <input type="text" value="In Edit" readonly/> */}
     <Button variant="contained" onClick={viewTable} disabled={reviewStatus === "in-review"}>Edit</Button>
    <Button variant="contained" onClick={saveChanges} disabled={reviewStatus === "in-review"}>Save</Button>
    <Button variant="contained" onClick={submitForReview} disabled={reviewStatus === "in-review"}>Submit for Review</Button>
    <label htmlFor="status">Status:</label><input type="text" id="status" value={reviewStatus === "in-edit" ? "In Edit" : "In Review"} disabled/>
    </div>
    {showTable && Object.keys(selectedData).length > 0 ?   (
    <form>
    <table >
      <tr>
        <div className='headerdiv'><th>Concept</th></div>
        {
          selectedData.Concept.map((item,i) => {
            return <td><div className="headerdiv2"><input type="text" value={item} onChange={(event) => handleChange(event, 'Concept', i)}/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Index</th></div>
        {
          selectedData.Index.map((item,i) => {
            return <td><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'Index', i)} disabled='True'/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Sem. Cat</th></div>
        {
          selectedData.SemCateOfNouns.map((item,i) => {
            return <td><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'SemCateOfNouns', i)}/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>G-N-P</th></div>
        {
          selectedData.GNP.map((item,i) => {
            return <td><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'GNP', i)}/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Dep-Rel</th></div>
        {
          selectedData.DepRel.map((item,i) => {
            return <td><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'DepRel', i)}/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Discourse</th></div>
        {
          selectedData.Discourse.map((item,i) => {
            return <td><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'Discourse', i)}/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Speaker's View</th></div>
        {
          selectedData.SpeakersView.map((item,i) => {
            return <td><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'SpeakersView', i)}/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Scope</th></div>
        {
          selectedData.Scope.map((item,i) => {
            return <td><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'Scope', i)}/></div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Sentence Type</th></div>
        {
          selectedData.SentenceType.map((item,i) => {
            return <td colSpan={selectedData.Concept.length}><div className="headerdiv2"><input type='text' value={item} onChange={(event) => handleChange(event, 'SentenceType', i)}/></div></td>
          }
         
          )
        }
      </tr>
    </table>
    </form>
    ):
   
    <table>
      <tr>
        <div className='headerdiv'><th>Concept</th></div>
        {
          selectedData.Concept.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Index</th></div>
        {
          selectedData.Index.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Sem. Cat</th></div>
        {
          selectedData.SemCateOfNouns.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>G-N-P</th></div>
        {
          selectedData.GNP.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Dep-Rel</th></div>
        {
          selectedData.DepRel.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Discourse</th></div>
        {
          selectedData.Discourse.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Speaker's View</th></div>
        {
          selectedData.SpeakersView.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Scope</th></div>
        {
          selectedData.Scope.map((item,i) => {
            return <td><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
      <tr>
        <div className='headerdiv'><th>Sentence Type</th></div>
        {
          selectedData.SentenceType.map((item,i) => {
            return <td colSpan={selectedData.Concept.length}><div className="headerdiv2">{item}</div></td>
          }
         
          )
        }
      </tr>
    </table>
   
    }
    </>



  )
};

export default USR;


