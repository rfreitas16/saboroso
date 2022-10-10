class HcodeGrid {

    constructor(configs){
        //SOBREESCREVER O LISTENER PARA FAZER ELE VIRAR PADRAO E PODER FAZER OUTRAS COISAS COM ELE
        configs.listeners = Object.assign({
            afterUpdateClick:(e)=>{
                $('#modal-update').modal('show');
            },
            afterDeleteClick:(e)=>{
                window.location.reload();
            },
            afterFormCreate: (e)=>{
                window.location.reload();
            },
            afterFormUpdate: (e)=>{
                window.location.reload();
            },
            afterFormCreateError: (e)=>{
                alert('Nao foi possivel enviar o formulario.');
            },
            afterFormUpdateError: (e)=>{
                alert('Nao foi possivel atualizar o formulario.');
            },

        }, configs.listeners);

        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate:'btn-update',
            btnDelete:'btn-delete',
            onUpdateLoad: (form, name, data)=>{
                let input = form.querySelector('[name='+name+']');
                if(input)input.value = data[name];
            }
        },configs);

        this.rows = [...document.querySelectorAll('table tbody tr')];
        this.initForms();
        this.initButtons();
    }
    initForms(){
        this.formCreate = document.querySelector(this.options.formCreate);
        //se o formulario existir
        if (this.formCreate) {
            this.formCreate.save({
                success:()=>{
                    this.fireEvent('afterFormCreate');
                },
                failure:()=>{
                    this.fireEvent('afterFormCreateError');
                }
            });
        }
        this.formUpdate = document.querySelector(this.options.formUpdate);
        //se o formulario existir
        if (this.formUpdate){
            this.formUpdate.save({
                success:()=>{
                this.fireEvent('afterFormUpdate');
                },
                failure:()=>{
                    this.fireEvent('afterFormUpdateError');
                }
            });
        }

    }
    //METODO PARA CHAMAR OS EVENTOS MAIS FACIL
    fireEvent(name, args){

       if(typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);
    }
    //METODO PARA PEGAR A LINHA 
    getTrData(e){

        let tr = e.composedPath().find(el => {
        
            return(el.tagName.toUpperCase() === 'TR');
            });
        return JSON.parse(tr.dataset.row);

    }

    btnUpdateClick(e){
        this.fireEvent('beforeUpdateClick', [e]);

                let data = this.getTrData(e);

        //         let tr = e.composedPath().find(el => {
        
        //             return(el.tagName.toUpperCase() === 'TR');
        // });
        //     let data = JSON.parse(tr.dataset.row);
            
            for(let name in data){

                this.options.onUpdateLoad(this.formUpdate, name, data);

                // let input = this.formUpdate.querySelector(`[name=${name}]`);

                // switch (name){
                //     case 'date':
                //         if (input) input.value = moment(data[name]).format('YYYY-MM-DD');
                //     break;
                //     case 'photo':
                //     formUpdate.querySelector("img").src = '/' + data[name];
                //     break;
                //     default:        
                //     if(input) input.value = data[name];
                // }
            }
 
                    this.fireEvent('afterUpdateClick', [e]);

                //     let input = formUpdate.querySelector(`[name=${name}]`);
    
                //     switch (name){
                //         case 'date':
                //             if (input) input.value = moment(data[name]).format('YYYY-MM-DD');
                //         break;
                //         default:        
                //         if(input) input.value = data[name];
                //     }
                // }
                //         $('#modal-update').modal('show');
                    

    }
    btnDeleteClick(e){
        this.fireEvent('beforeUpdateClick');
    
            //     let tr = e.composedPath().find(el => {
            
            //     return(el.tagName.toUpperCase() === 'TR');
            // });
            //     let data = JSON.parse(tr.dataset.row);
            let data = this.getTrData(e);
                // for(let name in data){
                    if(confirm(eval('`' + this.options.deleteMsg + '`'))){
                        fetch(eval('`' + this.options.deleteUrl+ '`'),{
                            method: 'DELETE'
                        })
                        .then(response => response.json())
                        .then(json =>{

                            this.fireEvent('afterDeleteClick');

                        });
                    }
                // }

    }

    initButtons(){

        this.rows.forEach(row=>{
            [...row.querySelectorAll('.btn')].forEach(btn=>{
                btn.addEventListener('click', e=> {

                    if(e.target.classList.contains(this.options.btnUpdate)) {
                        this.btnUpdateClick(e);
                    }else if (e.target.classList.contains(this.options.btnDelete)) {
                        this.btnDeleteClick(e);
                    } else {
                        this.fireEvent('buttonClick', [e.target, this.getTrData(e), e]);
                    }

                });

            });

        });
    }
        //UPDATE 

        // [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn =>{

        //     btn.addEventListener('click', e=>{
                
        //         this.fireEvent('beforeUpdateClick', [e]);

        //         let data = this.getTrData(e);

        // //         let tr = e.composedPath().find(el => {
        
        // //             return(el.tagName.toUpperCase() === 'TR');
        // // });
        // //     let data = JSON.parse(tr.dataset.row);
            
        //     for(let name in data){

        //         this.options.onUpdateLoad(this.formUpdate, name, data);

        //         // let input = this.formUpdate.querySelector(`[name=${name}]`);

        //         // switch (name){
        //         //     case 'date':
        //         //         if (input) input.value = moment(data[name]).format('YYYY-MM-DD');
        //         //     break;
        //         //     case 'photo':
        //         //     formUpdate.querySelector("img").src = '/' + data[name];
        //         //     break;
        //         //     default:        
        //         //     if(input) input.value = data[name];
        //         // }
        //     }
 
        //             this.fireEvent('afterUpdateClick', [e]);
        //      });
        // });


        // [...document.querySelectorAll(this.options.btnDelete)].forEach(btn =>{

        //     btn.addEventListener('click', e=>{

        //         this.fireEvent('beforeUpdateClick');
    
        //     //     let tr = e.composedPath().find(el => {
            
        //     //     return(el.tagName.toUpperCase() === 'TR');
        //     // });
        //     //     let data = JSON.parse(tr.dataset.row);
        //     let data = this.getTrData(e);
        //         for(let name in data){
        //             if(confirm(eval('`' + this.options.deleteMsg + '`'))){
        //                 fetch(eval('`' + this.options.deleteUrl+ '`'),{
        //                     method: 'DELETE'
        //                 })
        //                 .then(response => response.json())
        //                 .then(json =>{

        //                     this.fireEvent('afterDeleteClick');

        //                 });
        //             }
    
    //                 let input = formUpdate.querySelector(`[name=${name}]`);
    
    //                 switch (name){
    //                     case 'date':
    //                         if (input) input.value = moment(data[name]).format('YYYY-MM-DD');
    //                     break;
    //                     default:        
    //                     if(input) input.value = data[name];
    //                 }
    //             }
    //                     $('#modal-update').modal('show');
    //              });
    //         });
    // }







}