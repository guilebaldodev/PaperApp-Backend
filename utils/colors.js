    const colors = [
        '#FF6666',            
        '#4099FF',                
        '#FF9966',               
        '#66CCFF',            
        '#2ED8B6',            
        '#FF5370',              
        '#FFCC66',                
        '#FF9AA2',            
        '#96C8DA',             
        '#FFA07A',              
        '#FF4500',                 
        '#1E90FF',             
        '#FFD700',        
        '#8A2BE2',              
        '#00CED1',                 
    ];

    export const randomColor = ()=> {
             return  colors[Math.floor(Math.random() * colors.length)];
    }