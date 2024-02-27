class Star {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.image = img;
    this.radius = 8; // Adjust the radius based on your star size
    this.visible = true;
  }

  

  isCollided(cannonBall) {
    console.log("Checking collision for star", this.star);
     
    // Calculate distance between the star and cannonBall
    var distance = dist(this.x, this.y, cannonBall.body.position.x, cannonBall.body.position.y);

    console.log("Distance:", distance);
    console.log("Radius sum:", this.radius + cannonBall.r);

    // Check if the distance is less than the sum of the radii
    if (distance <= this.radius + cannonBall.r) {
        // Collision occurred
            
         
        return true;
    }

    // No collision
    return false;
  }
   

  display() {
    // Display the star if it's visible
    if (this.visible) {
      image(this.image, this.x, this.y, 40, 40);  
    }
  }

   
}