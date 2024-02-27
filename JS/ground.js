class Ground 
{
  constructor(x, y, w, h, color) 
  {
    let options = {
      isStatic:true
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.color = color;
    World.add(world, this.body);
  }

  show() {
    var pos = this.body.position;
    push();
    rectMode(CENTER);
    stroke(255);
    fill(this.color);
    rect(pos.x, pos.y, this.w, this.h);
    pop();
  }
  
}
