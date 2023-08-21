<template>
<section class="intro pt-3">
  <div class="bg-image h-100" style="background-color: #f5f7fa;">
    <div class="mask d-flex align-items-center h-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card">
              <div class="card-body p-0">
                <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 500px">
                  <table class="table table-striped mb-0">
                    <thead style="background-color: #002d72;">
                      <tr>
                        <th scope="col">Question</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Like a butterfly</td>
                        <td><button class="btn btn-primary">View</button>    <button class="btn btn-danger">Solution</button></td>
                      </tr>
                      <tr>
                        <td>Mind &amp; Body</td>
                        <td><button class="btn btn-primary">View</button>    <button class="btn btn-danger">Solution</button></td>
                        
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


</template>

<script>
</script>

<style>

.intro {
  height: 100%;
}


table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

thead th {
  color: #fff;
}

.card {
  border-radius: .5rem;
}

.table-scroll {
  border-radius: .5rem;
}

.table-scroll table thead th {
  font-size: 1.25rem;
}
thead {
  top: 0;
  position: sticky;
}
</style>

