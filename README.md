# Restaurant design 

1. Customer comes into a restaurant
2. Waiter assigns them a table
3. Customer starts ordering from the menu and can select multiple items and add them to a cart
4. Once the order is placed, the order will go to the kitchen Queue x.
5. The kitchen cook will see his queue x and prepare the food.
6. Once the food is ready, the kitchen cook will inform the waiter so he/she can pick the order and take it to the customer table. 


1. Restaurant has customers --crud operations
2. Restaurant has waiters -- crud operation
3. Restaurant has cooks -- crud operation
4. Restaurant has tables -- crud operation
5. Restaurant has menu -- crud operations 
6. Restaurant has a kitchen queue.
7. Order will have different status e.g order-placed, order-isBeingPrepared, order-IsReadyForPickup, order-IsServed 

Technologies tested:
1. Mongoose - Mongodb schema modelling
2. Nestjs
3. Swagger docs


Assumptions:

1. Auth is not required.

Entities:

1. Customer

* email 
* phonenumber

2. waiter

* employeeid 
* tableid


3. cook

* employeeid 
* tableid
* queueid

4. queue 

* name
* orderId

5. table 

* name 
* shape 
* capacity 

6. menu

* price 
* name


7. food

* price
* name
* etc

8. orderitem

* menuitemid 
* quantity
* subtotal
* orderid

9. order 

* tableid
* waiterid 
* userid 
* cookid 
* queueid 
* status - placed, cooking, ready, served

## user journey

user comes to the app

GET /menu

1. Get's all products/ menu categories
2. may have pagination

POST /cart 
1. userId 
2. [
  {
    menuItemId,
    quantity
  }
] as list of cartitems 

* Creates an orderitems

POST /order
1. userId

* Creates an order entity and



## kitchen journey


GET /queue/:cookId
 
* Pops the latest order from the queue
* Updates the order from order-placed to order-cooking
* When done, updates the order to order-ready

- Polling based system(20secs)
- Can be advanced to a push based design for better scalability

## Waiter journey

GET /orders?status=ready
* Takes the order and serves it
* Updates the order from order-ready to order-served 

- Polling based system(20secs)
- Can be advanced to a push based design for better scalability



















 




