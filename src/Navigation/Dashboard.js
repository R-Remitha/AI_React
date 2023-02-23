import { NavLink } from "react-router-dom";
import { FaEdit, FaEye, FaPlusCircle, FaTrash, FaUser } from "react-icons/fa";
import "./dashboard_css.css";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from 'react';



const Dashboard = () => {

  const [users, setUsers] = useState([])

  const fetchData = () => {
    fetch("http://localhost:9999/dash_data")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
      <nav>
        <NavLink to="/">
          <p>Authoring Interface</p>
        </NavLink>
        <div>
          <ul id="navbar">
            <li>
              <NavLink to="/dashboard">
                <FaUser></FaUser> Username :
                {/* {users.length > 0 && (
                  <ul>
                    {users.map(user => (
                      <td>{user.email}</td>
                    ))}
                  </ul>
                )} */}
                {/* {{ session.email }} */}
                {/* ${users.get(email)} */}
              </NavLink>
            </li>
            <li>
              <Button variant="contained" href="http://localhost:9999/logout">
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </nav>



      <div class="components">
        <div class="cards">
          <div id="card">5 Discourses created</div>
          <div id="card">25 USRs Generated</div>
          <div id="card">2 Discourses Approved</div>
          <div id="card">
            <a href="http://localhost:3000/usrgenerate">
              <FaPlusCircle size="50px" color="black"></FaPlusCircle>
            </a>
          </div>
        </div>

        <div class="discourse_but">
          <Button variant="contained" href="http://localhost:9999/dash_out">
            See Discourses
          </Button>
        </div>



        <div class="dis_table">
          <table>
            <tr>
              <th>S.No</th>
              <th>Discourse</th>
              <th>USRs</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>

            {users.length > 0 && (
              <ol>
                {users.map(user => (
                  <tr>
                    <td>1</td>
                    <td>{user.sentences}</td>
                    <td>{user.orignal_USR_json}</td>
                    <td>
                      <button class="but">
                        <a href="http://localhost:3000/usrgenerate">
                          <FaEye size="30px" color="black"></FaEye>
                        </a>
                      </button>
                      <button class="but">
                        <a href="http://localhost:3000/usrgenerate">
                          <FaEdit size="30px" color="black"></FaEdit>
                        </a>
                      </button>
                      <button>
                        <a href="http://localhost:3000/usrgenerate">
                          <FaTrash size="30px" color="black"></FaTrash>
                        </a>
                      </button>
                    </td>
                    <td>Approved</td>
                  </tr>
                ))}
              </ol>
            )}
          </table>
        </div>
      </div>

      {/* <Flex justify="space-between" m={4} align="center">
        <Flex gap="4">
          <Button onClick={() => gotoPage}>First Page</Button>
          <Button>Prev Page</Button>
        </Flex>
        <Flex gap="4">
          <Button>Next Page</Button>
          <Button>Last Page</Button>
        </Flex>
      </Flex> */}
    </>

  );
};

export default Dashboard;