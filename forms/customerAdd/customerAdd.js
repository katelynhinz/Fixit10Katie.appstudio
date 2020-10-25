/*
> Created a new form named customerAdd.
> Used a textArea or Dropdown to display the customer names
> Hard-coded the customer to add (just to save time). The name is :
       Jesse Antiques, 1113 F St, Omaha, NE, 68178
> When user clicks a button, the new customer is added to the control and the database.
> Tell the user their new customer was added to the database. 
> Uses a textArea to display the remaining customers.

Program 3 - Adding a customer
Scenario: You will create a program that adds a customer to the display 
control and the database. Then the revised list of customer names are displayed.
Requirements
Created a new form named customerAdd. 
Used a textArea or Dropdown to display the customer names
Hard-coded the customer to add (just to save time). The name is :
Jesse Antiques, 1113 F St, Omaha, NE, 68178
When user clicks a button, the new customer is added to the control and the database.
Tell the user their new customer was added to the database. 
Used a textArea to display the remaining customers. 
Note: make sure you don't add the employee ID since this is an auto-increment 
field (so the DB creates the number for you automatically).
*/

req = ""
query = ""
results = ""

btnAddCustomer.onclick = function() {
  query = "INSERT INTO customer VALUES ('17','Jesse Antiques','1113 F St','Omaha','NE','68178')"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kmh76825&pass=" + pw + "&database=kmh76825&query=" + query)

  if (req.status == 200) { //transit worked.
    if (req.responseText == 500) { // means the insert succeeded
      console.log("You have successfully added the Customer!")
    } else
      console.log("There was a problem with adding the Customer to the database.")
  } else {
    // transit error
    console.log("Error: " + req.status);
  }

  query = `SELECT name from customer ORDER BY customer_id DESC`
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kmh76825&pass=" + pw + "&database=kmh76825&query=" + query)

  if (req.status == 200) { //transit worked.
    //save the sate of the customer 
    results = JSON.parse(req.responseText)
  } else {
    // transit error
    console.log(`Error: ${req.status}`);
  }
  // putting new list of customers into txtDelete
  let customersAdd = ""
  for (i = 0; i <= results.length - 1; i++)
    customersAdd = customersAdd + results[i] + "\n"
  // change value of text area
  txtAdd.value = customersAdd
}
btnNextPage2.onclick=function(){
  ChangeForm(customerUpdate)
}



