/*
Requirements
Used a new form named customerSelect.
Used a Select query and AJAX call to get all the customers from the database. 
Displayed all the customers in a textArea or Dropdown so user can pick one. 
Used a sql Select  query to get all of the customers whose state matches the state of the customer chosen by the user. 
Used a textArea to show the user the matching customers, one per line, using a template literal. 
*/
/*
> form named customerSelect
> used Select to get all customers from database
> displayed all customers in textArea or Dropdown control 
> user can select one customer
> Used a sql Select  query to get all of the customers whose state matches the state of the customer chosen by the user. 
> Used a textArea to show the user the matching customers, one per line, using a template literal.
*/

/*  
let req = ""
let query = ""

customerSelect.onshow=function(){
    txtResults_contents.style.height = "100px"
}

btnSeePets.onclick=function(){
    query = "SELECT * FROM customer"
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kmh76825&pass=" + pw + "&database=clc90595&query=" + query)

    if (req.status == 200) { //transit trip worked.
        // Reminder
        // > req1.responseText is a JSON object with the results of the query in it.
        // > convert it to a format that you can work with
        // > parse it from a JSON object (JS Object Notaton) into an array that holds
        //   each row as an array in it. So a big array that holds small arrays, each 
        //   of which is a row from the query results returned. 
        
        results = JSON.parse(req.responseText)
        // see if results are correct
        console.log(results)
        
    if (results.length == 0)    // no results were returned by the query
        lblMessage1.textContent = "There are no customers in the database."
    else {        // query results were returned
        // this is what the results look like: 
        // [[47,"Paul","dog"],[23,"Marty","dog"],[34,"Jack","horse"]]  
        //    0                 1                    2
        // The first row,index 0 in the big array is an array: 
        //     [47,"Paul","dog"]
        //       0    1      2
        // so to get name of first pet:  arrayName[0][1]


        // Take a closer look:
        console.log(`the parsed JSON is ${results}`)
        console.log(`the first row/item in the big array is a small array: ${results[0]}`)
        console.log(`to get to Paul, need results[0][1]: ${results[0][1]}`)


        // Now output the names of all the dogs into the textArea control:
        let message = ""
        for (i = 0; i < results.length; i++)
            message = message + results[i][1] + "\n"
        txtResults.value = message
     } // end else

  } else   // the transit didn't work - bad wifi? server off?
        //transit error - Handle that with an error message.
        lblMessage1.textContent = "Error code: " + req.status
}
*/
// global variables for database calls
let req = ""
let query = ""
let results = ""
let pw = "14421442Kh" // put your database password here
let userName = 'kmh76825'


customerSelect.onshow=function(){
  drpCustomer.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kmh76825&pass=" + pw + "&database=kmh76825&query=" + query)

  if (req.status == 200) { //transit worked.
    customerSelectR = JSON.parse(req.responseText)
    console.log(customerSelectR)
  }
  if (customerSelectR.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers found.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= customerSelectR.length - 1; i++)
      drpCustomer.addItem(customerSelectR[i])
  }
}

drpCustomer.onclick=function(s){
  // this 'if' kicks user out if they  just clicked on control 
  // but not on one item in the list.
  if (typeof(s) == "object")
    return
  else { // the user picked something
    console.log(s)
    drpCustomer.value = s // make dropdown show the choice the user made
    query = `SELECT state from customer WHERE name = '${s}'`
    //Grab the state of the customer chosen
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerSelectState = JSON.parse(req.responseText)
      console.log(customerSelectState)
    }
    query = `SELECT name from customer WHERE state = '${customerSelectState[0]}'`
    // get the other customers who have the same state
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)
    
    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerSelectSameState = JSON.parse(req.responseText)
      console.log(customerSelectSameState)
    }
    
    let customerMessage = ""
    for (i = 0; i <= customerSelectSameState.length - 1; i++)
      customerMessage = customerMessage + customerSelectSameState[i] + "\n"
    // clear txt and then change
    txtResults.value = customerMessage
  }  
}


/*
btnDelete.onclick=function(){
  ChangeForm(customerDelete)
}
*/

