// LAST EDIT: 01/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      getCurrentTime,
      getCurrentDate,
      modifyDate,
      compareDateTime
   }

// DEFINIR FUNÇÕES #####################################################################################################
   function getCurrentTime(){

      if (process.env.DEBUG === 'true'){console.log('MOD_datetime: ' + 'getCurrentTime')}

      let date_ob = new Date();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();

         if (hours < 10){hours = "0" + hours}
         if (minutes < 10){minutes = "0" + minutes}
         if (seconds < 10){seconds = "0" + seconds}

      return `${hours}:${minutes}`;
   }

   function getCurrentDate(){

      if (process.env.DEBUG === 'true'){console.log('MOD_datetime: ' + 'getCurrentDate')}

      let date_ob = new Date();
      let day = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

         if (day < 10){day = "0" + day}
         if (month < 10){month = "0" + month}

      return `${day}/${month}/${year}`;
   }

   function modifyDate(ARG_STR_Data, ARG_INT_Dias, ARG_BOL_RetornarDataFormatoString){

      if (process.env.DEBUG === 'true'){console.log('MOD_datetime: ' + 'modifyDate')}

      if (!ARG_STR_Data || ARG_INT_Dias === undefined ){return}

      const ARR_Data = ARG_STR_Data.split('/');
      const STR_DataInicial = new Date(ARR_Data[2], ARR_Data[1] - 1, ARR_Data[0]); // ANO | MES | DIA

      STR_DataInicial.setDate(STR_DataInicial.getDate() + Number(ARG_INT_Dias));
         
         if (ARG_BOL_RetornarDataFormatoString){
            let day = STR_DataInicial.getDate();
            let month = STR_DataInicial.getMonth() + 1;
            let year = STR_DataInicial.getFullYear();

               if (day < 10){day = "0" + day}
               if (month < 10){month = "0" + month}

            return `${day}/${month}/${year}`;
         } else {
            return STR_DataInicial;
         }
   }

   function compareDateTime(ARG_STR_DataHoraMaior, ARG_STR_DataHoraMenor){

      if (process.env.DEBUG === 'true'){console.log('MOD_datetime: ' + 'compareDateTime')}

      if (!ARG_STR_DataHoraMaior || !ARG_STR_DataHoraMenor){return null}

      let STR_DataHoraMaior = ARG_STR_DataHoraMaior;
      STR_DataHoraMaior = STR_DataHoraMaior.substring(0, 10)
      let ARR_Data = STR_DataHoraMaior.split('/');
      let STR_Hora = ARG_STR_DataHoraMaior.substring(ARG_STR_DataHoraMaior.length - 5, ARG_STR_DataHoraMaior.length);
      let ARR_Hora = STR_Hora.split(':');
      let DATE_DataHoraMaior = new Date(ARR_Data[2], ARR_Data[1], ARR_Data[0], ARR_Hora[0], ARR_Hora[1]);

      let STR_DataHoraMenor = ARG_STR_DataHoraMenor;
      STR_DataHoraMenor = STR_DataHoraMenor.substring(0, 10)
      let ARR_DataB = STR_DataHoraMenor.split('/');
      let STR_HoraB = ARG_STR_DataHoraMenor.substring(ARG_STR_DataHoraMenor.length - 5, ARG_STR_DataHoraMenor.length);
      let ARR_HoraB = STR_HoraB.split(':');
      let DATE_DataHoraMenor = new Date(ARR_DataB[2], ARR_DataB[1], ARR_DataB[0], ARR_HoraB[0], ARR_HoraB[1]);
      
      let BOL_DataHoraEhMaior = Date.parse(DATE_DataHoraMaior) > Date.parse(DATE_DataHoraMenor);
      let BOL_DataHoraEhMenor = Date.parse(DATE_DataHoraMaior) < Date.parse(DATE_DataHoraMenor);
      let BOL_DataHoraEhIgual = Date.parse(DATE_DataHoraMaior) == Date.parse(DATE_DataHoraMenor);

         if (BOL_DataHoraEhIgual){
            return "igual"
         } else if (BOL_DataHoraEhMaior){
            return "maior"
         } else if (BOL_DataHoraEhMenor){
            return "menor"
         } else {
            return null;
         }

   }
