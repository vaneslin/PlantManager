/***Arduino Measurements***/
length = 70;
width = 53;
height = 15;

wallThickness = 3;
wiggleRoom = 1; //extra space inside case

/*** Lid ***/
translate( [0, -25, 50]) //positioned it above so top and bottom of lid is easily viewable

difference(){
    union() {
        //top lid
        color([0, 0.66, 0.66])
        translate( [0, 75, 2])
        cube([length + wiggleRoom*2 + wallThickness*2, width + wiggleRoom * 2 + wallThickness*2, 2]);
        
        //top lid inner area underneath
        color([0, 0.5, 0.66])
        translate( [wallThickness, 75 +  wallThickness, 0])
        cube([length + wiggleRoom*2, width + wiggleRoom * 2, 2]);
    }
    
    //engrave text onto lid
    color([0, 0.3, 0.3])
    scale([0.8, 0.8, 0.8])
    translate([18, 130, 2])
    linear_extrude(height = 4) {
        text("ARDUINO\u263A");
    }

    color([1, 1, 0.9])
    translate([30, 98, 3.75]) 
    scale([0.5, 0.5, 0.5])
    linear_extrude(height = 3) {
        text("plant manager");
    }
    
    //opening for analog wiring
    translate( [0.3*length + wallThickness, 75 + wallThickness, -2])
    cube ([0.7*length, 5, 7]);
    
    //opening for digital wiring
    translate( [0.3*length + wallThickness, 125 + wallThickness, -2])
    cube ([0.7*length, 5, 7]);
}


/*** Case ***/
union() { //make the case sides and bottom
    difference () {
    //outer box surface
    color([0, 0.1, 0.15])
    cube([length + 2*wallThickness + 2*wiggleRoom, width + 2*wallThickness + 2*wiggleRoom, height + wallThickness]);

    //inner box surface
    color([0, 0.4, 0.4])    
    translate([wallThickness, wallThickness, wallThickness])
    cube([length + wiggleRoom*2 , width + wiggleRoom * 2, height + wallThickness]); 

    //square opening for power connection
    color([0, 0.5, 0.66])    
    translate([-1, 34 + wallThickness + wiggleRoom, 2*wallThickness])
    cube([wallThickness + 2, 11, height - 2*wallThickness]);     
    }
    
    //make little nubs on bottom of case for support
    color([1, 1, 1]){
        translate([3*wallThickness, 3*wallThickness, -3])
        cylinder(4, 3, 5);
    
        translate([length + 2*wiggleRoom - wallThickness, 3*wallThickness, -3])
        cylinder(4, 3, 5);
    
        translate([3*wallThickness, width + 2*wiggleRoom - wallThickness, -3])
        cylinder(4, 3, 5);
    
        translate([length + 2*wiggleRoom - wallThickness, width + 2*wiggleRoom - wallThickness, -3])
        cylinder(4, 3, 5);
    }
}