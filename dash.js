function year (){
    (async () => {

        const { value: year } = await Swal.fire({
          title: 'Select Year',
          input: 'select',
          inputOptions: {
            'Year': {
              1: '1',
              2: '2',
              3: '3',
              4: '4'
            },
          },
          inputPlaceholder: 'Select your year',
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value != ' ') {
                resolve()
              } else {
                resolve('You need to select year :)')
              }
            })
          }
        })
        
        if (year) {
          Swal.fire(`You selected: ${fruit}`)
        }
        
        })()
}

