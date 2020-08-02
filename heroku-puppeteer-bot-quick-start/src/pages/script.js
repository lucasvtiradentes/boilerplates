// EXECUTAR FUNÇÕES ####################################################################################################
   main()

// DEFINIR FUNÇÕES #####################################################################################################
   async function main(){
      const el_card02 = document.getElementsByClassName('card')[0];
      const el_card02_content = el_card02.getElementsByClassName('card__content')[0];
      const el_card02_info = el_card02.getElementsByClassName('card__info')[0];
      const card02_Txt = await readFileContent('../analysis/bot_results.txt');
      await replaceElementContent(el_card02_info, getTextInfo(card02_Txt))
      await replaceElementContent(el_card02_content, getLastTenLines(card02_Txt))
   }

// DEFINIR FUNÇÕES #####################################################################################################
   async function replaceElementContent(element, content){
      if (element){
         element.innerText = content;
      }
   }

   async function readFileContent(textFile){
      const response = await fetch(textFile);
      const data = await response.text();
      return data;
   }

   function getLastTenLines(content){

      if (!content){return}

      const arr_lines = content.split('\n');
      const lines = arr_lines.length;
      const lastTen_bottom = Number(lines) - 11;
      const lastTen_upper = Number(lines) - 1;
      let lastTen_content;

      if (lastTen_bottom > 0){
            for(let x=lastTen_bottom; x <= lastTen_upper; x++){
               lastTen_content = !lastTen_content ? arr_lines[x] : lastTen_content + '\n' + arr_lines[x];
            }
         return lastTen_content;
      } else {
         return content;
      }
   }

   function getTextInfo(textFileContent){
      
      if (!textFileContent){return}

      const arr_lines = textFileContent.split('\n');
      const lines = arr_lines.length - 1;
      const lastline = arr_lines[arr_lines.length-2];
      const pedidos = lastline.split('Pedidos: ')[1];
      const vez = lastline.split(' - ')[2].split(' ')[0];

      const txt_return = `Linhas : ${lines}
                          Vez    : ${vez}
                          Pedidos: ${pedidos}`
      return txt_return;
   }
// #####################################################################################################################
