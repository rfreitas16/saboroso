class HcodeFileReader {

    constructor(inputEl, imgEl){

        this.inputEl = inputEl;
        this.imgEl = imgEl;

        //this.initInputEvent();

    }

    initInputEvent(){
      
        document.querySelector(this.inputEl).addEventListener("change", e=>{
            ///ERRO AQUI
            console.log(e.target.files[o]);
            this.reader(e.target.files[o]).then(result => {
                console.log();

                document.querySelector(this.imgEl).src = result;
            });
        });

    }

    reader(file){

        return new Promise((resolve, reject)=>{

        let reader = new FileReader();
        reader.onload= function(){
            console.log(reader);
            resolve(reader.result);

        }
        reader.onerror = function(){

            reject("nao foi possivel ler a imagem");
        }
        reader.readAsDataURL(file);

        });
    }
}