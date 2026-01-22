class Linea{
    x1;
    x2;
    y1;
    y2;
    col;

    constructor(x1=0,y1=0,x2=0,y2=0, col='black', width = 3){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.col = col;
        this.width = width;
    }
    pintarLinea(lienzo){
        var c = lienzo.getContext('2d');
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        const gradientBar = c.createLinearGradient(this.x2, this.y2, this.x1, this.y1);
        gradientBar.addColorStop(0, this.col);
        gradientBar.addColorStop(1, 'black');
        //c.clearRect(this.x1,this.y1,lienzo.width, lienzo.height); // limpiar el lienzo
        c.strokeStyle = gradientBar;
        //c.strokeStyle = this.col;
        c.lineWidth = this.width;
        c.stroke();
        return this;
    }
    borrarLinea(lienzo){
        var d = lienzo.getContext('2d');
        d.beginPath();
        d.moveTo(this.x1, this.y1);
        d.lineTo(this.x2, this.y1-100);   
        d.strokeStyle = '#008b38';   // colorFondo = "#008b38";
        d.lineWidth = this.width;
        d.stroke();
        return this;
    }

    toString(){
        return '('+this.x1+', '+this.y1+')-('+this.x2+', '+this.y2+')+COLOR '+this.col+' espesor '+this.width;
    }
}