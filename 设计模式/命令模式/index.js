class carManager{
            // request information
            requestInfo(model, id) {
                console.log("The information for " + model + " with ID " + id + " is foobar");
            }
    
            // purchase the car
            buyVehicle(model, id) {
                console.log("You have successfully purchased Item " + id + ", a " + model);
            }
    
            // arrange a viewing
            arrangeViewing(model, id) {
                console.log( "You have successfully booked a viewing of " + model + " ( " + id + " ) ");
            }
            
            execute(name){
                return this[name] && this[name].apply(this, [].slice.call(arguments, 1));
            }
}


let car = new carManager();
// 调用命令
car.execute("arrangeViewing", "Ferrari", "14523");
car.execute("requestInfo", "Ford Mondeo", "54323");
car.execute("requestInfo", "Ford Escort", "34232");
car.execute("buyVehicle", "Ford Escort", "34232");